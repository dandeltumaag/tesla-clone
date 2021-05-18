import React,{ useState, useEffect } from 'react'
import { auth, provider } from '../firebase' /*  */
import { useDispatch, useSelector } from 'react-redux' /* useDispatch */
import { useHistory } from 'react-router-dom' /*  */

import {
  selectUserName,
  selectUserPhoto,
  selectUserEmail,
  setUserLogin,
  setSignOut
} from '../features/user/userSlice'


import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

// import { RemoveScroll } from 'react-remove-scroll/UI'

import { selectCars } from "../features/car/carSlice"

function Header() {
	const dispatch = useDispatch() /*  */
	const history = useHistory() /*  */
	const userName = useSelector(selectUserName) /*  */
  const userPhoto = useSelector(selectUserPhoto) /*  */
  const userEmail = useSelector(selectUserEmail) /*  */


	const [burgerStatus, setBurgerStatus] = useState(false)
	const cars = useSelector(selectCars)

	const changeBurgerStatus = () => {
		setBurgerStatus(!burgerStatus)
		const bodySelect = document.querySelector("body")
		bodySelect.classList.toggle("hideScroll")		
	}

  useEffect( () => {
    auth.onAuthStateChanged(async(user)=>{
      if(user){
        dispatch(setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        }))
        history.push("/")
      }
    })
  }, [])

  const signIn = () => {
    // create a popup window to login using google
    auth.signInWithPopup(provider)
    .then( (result) => {
      // if result is found grab the result ie, name, email, photo
      let user = result.user
      dispatch(setUserLogin({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }))
      history.push("/")
			console.log("output",userEmail)
    })
	}

  const signOut = () => {
    auth.signOut()
    .then( () => {
      dispatch(setSignOut())
      history.push("/")
    })
  }	

	
	return (
		<Container>
			<a>
				<img src="/images/logo.svg" alt="" />
			</a>
			<Menu>
				{cars && cars.map( (car, index) => (
					<a key={index} href="#">{car}</a>
				))}
			</Menu>
			<RightMenu>
				<a href="#">Shop</a>
				{!userName ?
					<Login onClick={signIn}>
							Tesla Account
					</Login> :
					<UserImg onClick={signOut} src={userPhoto} />			
				}
				<CustomMenu onClick={ changeBurgerStatus } />
			</RightMenu>
			{/* <RemoveScroll> */}
				<BurgerNav show={burgerStatus}>
					<CloseWrapper>
						<CustomClose onClick={ changeBurgerStatus } />
					</CloseWrapper>
					{cars && cars.map( (car, index) => (
						<li><a key={index} href="#">{car}</a></li>
					))}
					<li> <a href="#">Existing Inventory</a> </li>
					<li> <a href="#">Used Inventory</a> </li>
					<li> <a href="#">Trade-in</a> </li>
					<li> <a href="#">Cybertruck</a> </li>
					<li> <a href="#">Roadster</a> </li>
					<li> <a href="#">Semi</a> </li>
					<li> <a href="#">Charging</a> </li>
					<li> <a href="#">Power</a> </li>
					<li> <a href="#">Components</a> </li>
					<li> <a href="#">Utilities</a> </li>
					<li> <a href="#">Test Drive</a> </li>
				</BurgerNav>
			{/* </RemoveScroll> */}
		</Container>
	)
}

export default Header

const Container = styled.div `
	position: fixed;
	min-height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;

	background-color: rgba( 255, 255, 255, 0.5);
	box-shadow: 0 35px 55px rgba(0, 0, 0, 0.1);

	@media(max-width: 400px){
		min-height: 40px;
		padding: 0 10px;
		a{
			img{
				width: 75px;
			}
		}
	}
`

const Menu = styled.div `
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	
	a{
		color: black;
		font-weight: 600;
		text-transform: uppercase;
		padding: 0 10px;
		white-space: nowrap;
	}

	@media(max-width: 768px){
		display: none;
	}
`

const RightMenu = styled.div `
	display: flex;
	align-items: center;
	a{
		color: black;
		font-weight: 600;
		text-transform: uppercase;
		margin-right: 10px;
		white-space: nowrap;
	}
	@media(max-width: 400px){
		a{
			font-size: 12px;
		}
	}

`

const CustomMenu = styled(MenuIcon) `
	cursor: pointer;
`

const BurgerNav = styled.div `
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	background: rgba( 255, 255, 255, 1);
	width: 300px;
	z-index: 16;
	list-style: none;
	padding: 20px;
	display: flex;
	flex-direction: column;
	text-align: start;

	transform: ${ props => props.show ? 'translateX(0)' : 'translateX(100%)'};
	transition: transform 0.2s ease-in-out;

	overflow-y: scroll ;
	
	li{
		padding: 15px 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);

		a{
			color: black;
			font-weight: 600;
		}
	}

	::-webkit-scrollbar {
  	display: none;
	}
`

const CloseWrapper = styled.div `
	display: flex;
	justify-content: flex-end;
`

const CustomClose = styled(CloseIcon) `
	cursor: pointer;
`

const Login = styled.a `
	cursor: pointer;
`

const signOut = styled(Login) ``

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`
