import React from 'react';
import { connect } from 'react-redux';
import { Panel, PanelGroup, Col, Row, Well, Button } from 'react-bootstrap';

class Cart extends React.Component{
    render() {
        if (this.props.cart[0]) {
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }
    renderEmpty() {
        return (
        <div></div>
    )}
    renderCart() {
        const cartItemsList = this.props.cart.map((cartArr) => (
            <Panel 
            style={{padding: '1em'}}
            key={cartArr.id}>
                <Row>
                    <Col xs={12} sm={4}>
                        <h6>{cartArr.title}</h6>
                    </Col>
                </Row>
            </Panel>
        ))
        return (
            <Panel
                
                bsStyle="primary">
                <Panel.Heading>Cart</Panel.Heading>
                <Panel.Body>
                    {cartItemsList}
                </Panel.Body>
            </Panel>
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart
    }
}
export default connect(mapStateToProps)(Cart);