import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

import Store from "../../assets/store.jpg";
import Beauty from "../../assets/beauty.jpg";
import Fragrance from "../../assets/fragrance.jpg";
import Furniture from "../../assets/furniture.jpg";
import Grocery from "../../assets/grocery.jpg";

function Home() {
    return (
        <main className="home">
            <section className="first">
                <div className="hero">
                    <p>HOWFA!</p>

                    <div className="copy1">
                        <h1>Beta<br/>deal dey ground<br/>for betabuy.</h1>
                        <p>Betabuy store is the surest marketplace for beauty, fragrance, grocery and furniture<br/>commodities. Betabuy boasts a user-friendly interface that makes it easy to navigate<br/>any webpage of the web application.</p>

                        <h1 className="h1" style={{display: 'none'}}>Beta deal dey ground for betabuy.</h1>
                        <p className="p" style={{display: 'none'}}>Betabuy store is the surest marketplace for beauty, fragrance, grocery and furniture commodities. Betabuy boasts a user-friendly interface that makes it easy to navigate any webpage of the web application.</p>
                    </div>
                </div>

                <div className="imageContainer">
                    <img src={Store} alt="Store" title="Store"/>
                </div>
            </section>

            <section className="second">
                <div className="body">
                    <p>E BOKKU!</p>
                    <h1>We get everything!</h1>
                    <p>There's nothing you want that we don't have.</p>
                </div>

                <div className="cardContainer">
                    <div className="card">
                        <div className="cardImage">
                            <img src={Beauty} alt="Beauty" title="Beauty"/>
                        </div>

                        <div className="titleAndTotal">
                            <p>Beauty</p>
                            <p>30 items</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="cardImage">
                            <img src={Fragrance} alt="Fragrance" title="Fragrance"/>
                        </div>

                        <div className="titleAndTotal">
                            <p>Fragrance</p>
                            <p>40 items</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="cardImage">
                            <img src={Furniture} alt="Furniture" title="Furniture"/>
                        </div>

                        <div className="titleAndTotal">
                            <p>Furniture</p>
                            <p>25 items</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="cardImage">
                            <img src={Grocery} alt="Grocery" title="Grocery"/>
                        </div>

                        <div className="titleAndTotal">
                            <p>Grocery</p>
                            <p>15 items</p>
                        </div>
                    </div>
                </div>

                <Link to="/store">
                    <button>View store</button>
                </Link>
            </section>
        </main>
    )
}

export default React.memo(Home);