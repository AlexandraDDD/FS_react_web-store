import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card,  Row } from 'react-bootstrap'
import { Context } from '../..'


const Brandbar = observer(() => {
    const { device } = useContext(Context)
    return (
        <Row className={'d-flex'}>
            {device.brands.map(brand =>
                <Card
                    style={{
                        cursor: 'pointer',
                        width: 'fit-content', marginRight: 15,
                        backgroundColor:
                        (brand.id === device.selectedBrand.id) ? 'blue' : 'transparent'
                    }}
                    
                    active={(brand.id === device.selectedBrand.id).toString()}
                    key={brand.id}
                    onClick={() => device.setSelectedBrand(brand)}
                >{brand.name}</Card>
            )}

        </Row>
    )
})


export default Brandbar