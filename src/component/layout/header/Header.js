import React, { useState } from 'react'
import { MdAccountCircle } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

export default function Header() {
    const history = useHistory();
    const [keyword, setKeyword] = useState("");
    function searchSubmitHandler(e) {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push("/products");
        }
    }
    return (
        <>
            <div className="hidden md:flex header w-[100vw] bg-[#0f1111]  justify-between items-center h-[5rem] text-white gap-[20px] fixed z-10 ">
                <div className='headerleft flex justify-center items-center gap-[20px] text-[40px] p-[14px]'>
                    <Link to="/" className="headercolorclass text-white list-none no-underline">
                        <span className='headerleftlogo hover:border hover:border-solid hover:border-white cursor-pointer'>amazon.in</span>
                    </Link>
                    <Link to="/products" className="headercolorclass text-white list-none no-underline">
                        <div className='headerleftproducts hover:border hover:border-solid hover:border-white cursor-pointer hover:p-[0.2rem] text-[30px]'>Products</div>
                    </Link>

                </div>
                <div className="headermid max-w-[700px] flex-grow-[1]">
                    <form className="headersearchBox flex justify-center items-center hover:border-[3px] hover:border-solid hover:border-[#ff9900] hover:rounded-[14px]" onSubmit={searchSubmitHandler}>
                        <input
                            type="text"
                            placeholder="Search Amazon.in"
                            onChange={(e) => setKeyword(e.target.value)}
                            className='py-[15px] px-[4px] w-[100%] border rounded-tl-[10px] rounded-tr-none rounded-bl-[10px] rounded-br-none box-border outline-none text-black'
                        />
                        <button type="submit"
                            className='border rounded-tr-[10px] rounded-tl-none rounded-br-[10px] rounded-bl-none bg-[#ff9900] py-[19px] px-[1px] w-[50px] cursor-pointer transition-all hover:bg-[#ff7000] flex justify-center items-center'
                        >
                            <BiSearch />
                        </ button>

                    </form>

                </div>
                <div className="headerright flex justify-center items-center gap-[20px] text-[38px] pr-[40px]">
                    <Link to="/cart" className="headercolorclass text-white list-none no-underline">
                        <MdAddShoppingCart className='headercarticon hover:border hover:border-solid hover:border-white cursor-pointer p-[0.3rem] text-[55px]' />
                    </Link>

                    <Link to="/login" className="headercolorclass text-white list-none no-underline">
                        <MdAccountCircle className='headerusericon hover:border hover:border-solid hover:border-white cursor-pointer p-[0.3rem] text-[55px]' />
                    </Link>
                </div>
            </div>

            {/* For Mobile view */}
            <div className="flex flex-col md:hidden header w-[100vw] bg-[#0f1111]  justify-center items-center text-white gap-[20px] fixed z-10 ">
                <div className='headerleft flex justify-around items-center gap-[10px] text-[25px] md:text-[25px] pt-[4px]'>
                    <Link to="/" className="headercolorclass text-white list-none no-underline">
                        <span className='headerleftlogo hover:border hover:border-solid hover:border-white cursor-pointer'>amazon.in</span>
                    </Link>
                    <Link to="/products" className="headercolorclass text-white list-none no-underline">
                        <div className='headerleftproducts hover:border hover:border-solid hover:border-white cursor-pointer hover:p-[0.2rem]'>Products</div>
                    </Link>
                    <Link to="/cart" className="headercolorclass text-white list-none no-underline">
                        <MdAddShoppingCart className='headercarticon hover:border hover:border-solid hover:border-white cursor-pointer text-[40px]' />
                    </Link>

                    <Link to="/login" className="headercolorclass text-white list-none no-underline">
                        <MdAccountCircle className='headerusericon hover:border hover:border-solid hover:border-white cursor-pointer text-[40px]' />
                    </Link>

                </div>
                <div className="headermid mb-[20px] max-w-[700px] flex-grow-[1]">
                    <form className="headersearchBox flex justify-center items-center hover:border-[3px] hover:border-solid hover:border-[#ff9900] hover:rounded-[14px]" onSubmit={searchSubmitHandler}>
                        <input
                            type="text"
                            placeholder="Search Amazon.in"
                            onChange={(e) => setKeyword(e.target.value)}
                            className='py-[15px] px-[4px] w-[100%] border rounded-tl-[10px] rounded-tr-none rounded-bl-[10px] rounded-br-none box-border  text-black'
                            style={{ outline: "none", }}
                        />
                        <button type="submit"
                            className='border rounded-tr-[10px] rounded-tl-none rounded-br-[10px] rounded-bl-none bg-[#ff9900] py-[19px] px-[1px] w-[50px] cursor-pointer transition-all hover:bg-[#ff7000] flex justify-center items-center'
                        >
                            <BiSearch />
                        </ button>

                    </form>

                </div>
            </div>

        </>
    )
}
