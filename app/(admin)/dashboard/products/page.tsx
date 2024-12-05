interface ProductsPageProps{
    params:{
        id: string
    }
}

const ProductsPage = ({params} : ProductsPageProps) => {
    console.log(params)
    return ( 

        <h1>Products</h1>
     );
}
 
export default ProductsPage;