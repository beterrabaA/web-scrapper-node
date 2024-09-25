import type { ServerResponse } from "http";
import * as cheerio from "cheerio";
import { type Product } from "../interfaces/Product.js";

// Send the response with the status code and data
export const sendResponse = (response: ServerResponse, statusCode: number, data: any) => {
    response.writeHead(statusCode, { "Content-Type": "application/json" });
    response.end(JSON.stringify(data));
}; 

const WEBSCRAPER_URL = "https://webscraper.io/test-sites/e-commerce/static/computers/laptops"

// Crawl the data from the website
export const crawlData = async (): Promise<Product[]> => {
    const productList: Product[] = []; // Create an empty array to store the product details
    let limit: number = 1; // Set the limit to 1 by default

    for (let i = 1; i <= limit; i++) {
        const url = `${WEBSCRAPER_URL}?page=${i}` // Create the URL with the page number

        await fetch(url).then(res => res.text()).then(html => {
            const $ = cheerio.load(html) // Load the HTML content
            const product = $("div.product-wrapper") // Select the product wrapper
            
            if (limit === 1) {
                const pageLimit = $("li.page-item:nth-last-child(+2)").text().trim()
                limit = parseInt(pageLimit)
            } // Get the total number of pages if limit is 1

            if (product.find("a.title").text().includes("Lenovo")) {
                product.each((_index, element) => {
                    // Create a temporary product object
                    let tempProduct: Product = { title: "", description: "", price: 0, imgUrl: "", rating: 0, review: 0 };
                    const title = $(element).find("a.title").attr("title") // Get the title of the product

                    if (title?.includes("Lenovo")) {
                        tempProduct.title = title;
                        tempProduct.description = $(element).find("p.description").text();
                        tempProduct.price = parseFloat($(element).find("h4.price").text().substring(1));
                        tempProduct.imgUrl = $(element).find("img").attr("src") || "";
                        tempProduct.review = parseInt($(element).find("p.review-count").text().replace(" reviews", ""));
                        tempProduct.rating = parseInt($(element).find('p[data-rating]').attr('data-rating') || "0");

                        productList.push(tempProduct)
                    } // Add the product details to the productList if the title includes "Lenovo"
                }) // Loop through each product
            } // Get the product details if the title includes "Lenovo"


        })
    }

    const sortedProductList = productList.sort((a, b) => b.price - a.price).reverse() // Sort the productList by price in descending order

    return sortedProductList // Return the sorted productList
}

