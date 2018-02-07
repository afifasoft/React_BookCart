import React from 'react';
import { connect } from 'react-redux';
import { Panel, PanelGroup, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { deleteCartItem } from '../../actions/cartActions';


class Cart extends React.Component{

    onDelete(_id) {
        console.log(this.props.cart)
        let cartAfterDelete = this.props.cart.filter((item) => item._id !== _id);
        // console.log(cartAfterDelete);
        

        // const currentBookToDelete = this.props.cart;
        // const indexToDelete = currentBookToDelete.findIndex(
        //     (cart) => {
        //         return cart._id === _id
        //     }
        // )
        // let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), 
        // ...currentBookToDelete.slice(indexToDelete + 1)]
        
        this.props.deleteCartItem(cartAfterDelete);
    }

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
            key={cartArr._id}>
                <Row>
                    <Col xs={12} sm={4}>
                        <h6>{cartArr.title}</h6>
                        <span>    </span>
                    </Col>
                    <Col xs={12} sm={2}>
                        <h6>usd. {cartArr.price}</h6>
                    </Col>
                    <Col xs={12} sm={2}>
                        <h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                    </Col>     
                    <Col xs={6} sm={4}>
                        <ButtonGroup style={{minWidth: '300px'}}>
                            <Button bsStyle="default" bsSize="small">-</Button>
                            <Button bsStyle="default" bsSize="small">+</Button> 
                            <span>     </span>    
                            <Button bsStyle="danger" bsSize="small" onClick={this.onDelete.bind(this, cartArr._id)}>DELETE</Button>                       
                        </ButtonGroup>
                    </Col>                                    
                </Row>
            </Panel>
        ), this)
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteCartItem
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);