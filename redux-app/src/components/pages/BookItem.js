import React from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../../actions/cartActions';



class BookItem extends React.Component {
    handleCart() {
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            price: this.props.price,
            quantity: 1
        }]
        // CHECK IF CART IS EMPTY
        if (this.props.cart.length > 0) {
            let _id = this.props._id;
            let item = this.props.cart.filter((item) => item._id === _id)
            console.log(item)
            if (!item.length) {
                this.props.addToCart(book)
            } else {
                // UPDATE THE QUANTITY
                this.props.updateCart(_id, 1, this.props.cart);
            }
        } else {
            // CART IS EMPTY
            this.props.addToCart(book)
        }

    }
    constructor() {
        super();
        this.state = {
            isClicked: false
        }
    }
    onReadMore() {
        this.setState({ isClicked: true})
    }
    onReadLess() {
        this.setState({ isClicked: false })
    }
    render() {
        return (
            <Well>
                <Row>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.images} responsive />
                    </Col>
                    <Col xs={12} sm={4}>
                        <h6>{this.props.title}</h6>
                        <p>{(this.props.description.length > 50 && this.state.isClicked === false ) ? (this.props.description.substring(0, 50)) : (this.props.description)}
                            <button className='link' onClick={(this.state.isClicked === false ) ? (this.onReadMore.bind(this)) : (this.onReadLess.bind(this))} >
                                { (this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50) ? ('..read more')
                                : (this.state.isClicked === true && this.props.description !== null && this.props.description.length > 50) ? ('...read less') 
                                : ('')
                                    }
                                
                            </button>
                        </p>
                        <h6>usd. {this.props.price}</h6>
                        <Button
                            onClick={this.handleCart.bind(this)}
                            bsStyle='primary'
                        >Buy Now</Button>

                    </Col>
                </Row>
            </Well>
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
        addToCart,
        updateCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);