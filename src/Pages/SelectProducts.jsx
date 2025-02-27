import React from 'react'
import CardProduct from '../Components/ProductCard/CardProduct'
import all_product from '../Components/1RenderingAssets/all_product'
import { useSearch } from '../Context/SearchContext'
import { useNavigate } from 'react-router-dom'

const SelectProducts = () => {
    const { setSelectedProd } = useSearch();
    const navigate = useNavigate();

    return (
        <div>

            {
                all_product.map(product => (
                    <div key={product.id} onClick={() => { setSelectedProd(product); navigate('/createCampaign') }}>
                        <CardProduct key={product.id} image={product.image} name={product.name} new_price={product.new_price} />
                    </div>
                ))

            }

        </div>
    )
}

export default SelectProducts