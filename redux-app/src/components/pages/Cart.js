import React from 'react';
import { connect } from 'react-redux';
import { Modal, Panel, PanelGroup, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { deleteCartItem, updateCart, getCart } from '../../actions/cartActions';


class Cart extends React.Component {
    componentDidMount() {
        this.props.getCart();
    }
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
    onIncrement(_id) {
        this.props.updateCart(_id, 1, this.props.cart)
    }
    onDecrement(_id, quantity) {
        if (quantity > 1) {
            this.props.updateCart(_id, -1, this.props.cart)
        }
    }
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }
    open() {
        this.setState({ showModal: true })
    }
    handleClose() {
        this.setState({ showModal: false })
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
        )
    }
    renderCart() {
        const cartItemsList = this.props.cart.map((cartArr) => (
            <Panel
                style={{ padding: '1em' }}
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
                        <ButtonGroup style={{ minWidth: '300px' }}>
                            <Button bsStyle="default" bsSize="small" onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}>-</Button>
                            <Button bsStyle="default" bsSize="small" onClick={this.onIncrement.bind(this, cartArr._id)}>+</Button>
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
                    <Row>
                        <Col xs={12}>
                            <h6>Total amount: {this.props.totalAmount}</h6>
                            <Button bsSize="small" bsStyle="success" onClick={this.open.bind(this)}>PROCEED TO CHECKOUT</Button>
                        </Col>
                    </Row>



                    <Modal show={this.state.showModal} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thank you!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>Your order has been saved!</h6>
                            <p>You will receive an email confirmation</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Col xs={6}>
                                <h6>total $: {this.props.totalAmount}</h6>
                            </Col>
                            <Col xs={6}>
                                <Button onClick={this.handleClose.bind(this)}>Close</Button>
                            </Col>
                        </Modal.Footer>
                    </Modal>



                </Panel.Body>
            </Panel>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteCartItem,
        updateCart,
        getCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);