interface Product {
    title: string,
    description: string,
    price: number,
    imgUrl: string,
    memoryType: Memory
    swatch: string[],
    rating: number,
    review: number
}

enum Memory {
    HDD,
    SSD
}