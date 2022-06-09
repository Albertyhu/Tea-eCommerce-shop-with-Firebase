import React, { useState, useRef, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './screens/home_page';
import ProductPage from './screens/product_page'; 
import './style/myStyle.css'
import { MyContext } from './components/contextItem.js'; 
import SignIn from './screens/nonMember/signIn.js';
import SignUp from './screens/nonMember/signUp.js'; 
import AccountPage from './screens/account/accountPage.js';
import { LoadProducts } from './components/loadProducts.js'; 
import ProductProfilePage from './screens/product_page/productProfile/productProfile.js'; 
import RenderCheckOut from './screens/checkout/checkoutPage.js'; 
import RenderWishList from './screens/wishlist/wishlist.js';
import RenderCartPage from './screens/cart/renderCartPage.js'; 
import OrderPage from './screens/order/order.js'; 

//firebase code 
import { db } from './firebase/initializeFirebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth(); 
const currentUser = auth.currentUser; 

function App() {
    const [cart, setCart] = useState([])
    const [wishlist, setWish] = useState([]); 
    const [teaData, setTeaData] = useState(null)
    const [openPanel, setOpenPanel] = useState(false);
    //for users with small mobile devices 
    const [hamburgerPanel, setHamburgerPanel] = useState(false); 
    const [accountPanel, setAccountPanel] = useState(false); 
    const [addProductMessage, setAddProductMessage] = useState(false); 
    const [searchResults, setSearchResults] = useState([])
    const [user, setUser] = useState(currentUser); 
    const [shipping, setShipping] = useState({
        address1: '742 Evergreen Terrace',
        address2: 'n/a',
        city: 'Springfield',
        state: 'Illinois',
        zipcode: '94575',
        country: "United States"
      
    })
    const [billingAddress, setBillingAdd] = useState({
        address1: '742 Evergreen Terrace',
        address2: 'n/a',
        city: 'Springfield',
        state: 'Illinois',
        zipcode: '94575',
        country: "United States"
    })
    const ref = useRef();
    const hamburgerRef = useRef()
    const messageRef = useRef() 
    const accountPanelRef = useRef()
    const context = {
        addProduct: (productID, additionalStock, ProductPrice) => {
            var newArr = [...cart]; 
            var obj = newArr.find(item => item.ID === productID)
            if (obj) {
                //add stock to existing product in cart
                var ind = newArr.indexOf(obj)
                newArr[ind].stock += additionalStock; 
            }
            else {
                //add new item to cart array
                const newItem = {
                    ID: productID,
                    stock: additionalStock, 
                    price: ProductPrice, 
                }
                newArr.push(newItem)
            }
            setCart([...newArr])
        },
        removeFromCart: (productID) => {
            var arr = cart.filter(val => val.ID !== productID);
            setCart(arr);

        },
        updateCart: () => { },
        updateItemInCart: () => { }, 
        getCart: () => { return cart },
        toggleCartPanel: () => {
            setOpenPanel(!openPanel); 
        },
        openCartPanel: () => {
            setOpenPanel(true); 
        }, 
        closeCartPanel: () => {
            setOpenPanel(false);
        },
        openHamburgerPanel: () => {
            setHamburgerPanel(true)
        },
        closeHamburgerPanel: () => {
            setHamburgerPanel(false)
        },
        toggleHamburgerPanel: () => {
            setHamburgerPanel(!hamburgerPanel)
        },
        openAddProductMessage: () => {
            setAddProductMessage(true)
        },
        closeAddProductMessage: () => {
            setAddProductMessage(false)
           
        },
        //for closing Cart Panel when clicking outside it 
        getRef: () => { return ref; },
        getMessageRef: () => { return messageRef; },
        getHamburgerRef: () => { return hamburgerRef; },
        calculateTotalCost: () => {
            var total = 0; 
            cart.forEach(item => {
                total += (item.price * item.stock)
            })
            return total; 
        },
        calculateTotalItems: () => {
            var total = 0; 
            cart.forEach(item => {
                total += item.stock; 
            })
            return total; 
        },

        //code for user authentication 
        //sets the current user 
        setCurrentUser: (currentUser) => { setUser(currentUser) },
        getCurrentUser: () => { return user },

        //code for account panel
        getAccountPanelRef: () => { return accountPanelRef }, 
        closeAccountPanel: () => { setAccountPanel(false) }, 
        openAccountPanel: () => {
            setAccountPanel(true)
        }, 
        getTeaData: () => { return teaData },
        getWish: () => { return wishlist },
        setWish: (productID) => {
            var arr = wishlist; 
            arr.push(productID)
            setWish(arr)
        },
        removeWish: (productID) => {
            var arr = wishlist.filter(val => val !== productID);
            setWish(arr)
        }, 
        getShippingAdd: () => { return shipping },
        setShippingAdd: (address) => {
            setShipping(address)
        }, 
        getBillingAdd: () => { return billingAddress },
        setBillingAdd: (address) => {
            setBillingAdd(address)
        },  
    }

    return (
      <MyContext.Provider value = {context}>
      <div className="App" id="rootContainer" >
          <BrowserRouter>
              <Routes>
                <Route
                    path="/tea-eCommerce-shop"
                    element={<Home
                        openPanel={openPanel}
                        openHamburger={hamburgerPanel}
                        accountPanel={accountPanel}
                    />}
                /> 
                <Route
                    path="/product_page"
                    element={<ProductPage
                        openPanel={openPanel}
                        addProductMessage={addProductMessage}
                        openHamburger={hamburgerPanel}
                        accountPanel={accountPanel}
                    />} />
                <Route
                    path='/sign_in'
                    element={<SignIn
                        openPanel={openPanel}
                        openHamburger={hamburgerPanel}
                        accountPanel={accountPanel}
                    />}
                />
                <Route
                    path='/sign_up'
                    element={<SignUp
                        openPanel={openPanel}
                        openHamburger={hamburgerPanel}
                        accountPanel={accountPanel}
                    />}
                />
                <Route
                    path='/acount_page'
                    element={<AccountPage
                        openPanel={openPanel}
                        openHamburger={hamburgerPanel}
                        accountPanel={accountPanel}
                    />}
                        />
                    <Route
                        path='/product_profile'
                        element={<ProductProfilePage
                            openPanel={openPanel}
                            openHamburger={hamburgerPanel}
                            accountPanel={accountPanel}
                            addProductMessage={addProductMessage}
                        />}
                        />
                    <Route
                        path='/checkout'
                            element={<RenderCheckOut
                                cart={cart}
                                openPanel={openPanel}
                                openHamburger={hamburgerPanel}
                                accountPanel={accountPanel}
                                addProductMessage={addProductMessage}
                        />}
                        />
                        <Route
                            path='/wishlist'
                            element={<RenderWishList
                                cart={cart}
                                openPanel={openPanel}
                                openHamburger={hamburgerPanel}
                                accountPanel={accountPanel}
                                addProductMessage={addProductMessage}
                                wishlist={wishlist}
                            />}
                        />
                        <Route
                            path='/cart'
                            element={<RenderCartPage
                                cart={cart}
                                openPanel={openPanel}
                                openHamburger={hamburgerPanel}
                                accountPanel={accountPanel}
                                addProductMessage={addProductMessage}
                            />}
                        />
                        <Route
                            path='/orders'
                            element={<OrderPage
                                cart={cart}
                                openPanel={openPanel}
                                openHamburger={hamburgerPanel}
                                accountPanel={accountPanel}
                                addProductMessage={addProductMessage}
                            />}
                        />
              </Routes>
          </BrowserRouter>    
      </div>
      </MyContext.Provider>
  );
}

export default App;
