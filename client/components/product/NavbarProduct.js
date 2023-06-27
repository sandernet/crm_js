import { Nav, NavItem, NavLink } from 'reactstrap';
import ContextProduct from '../../context/ContextProduct';
import ContextMP from '../../context/ContextMP';


export default function NavbarProduct() {
    return (
        <ContextProduct.Consumer>
            {(context) => (
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            active
                            href={`/products/${context?.id}`}
                        >
                            Общие параметры
                        </NavLink>
                    </NavItem>
                    <ContextMP.Consumer>
                        {(contextMPlase) => (
                            contextMPlase.map((item, index) => (
                                <NavItem key={index}>
                                    {/* <NavLink href={`${context?.id}/${item?.id}`}> */}
                                    <NavLink>
                                        {item?.name}
                                    </NavLink>
                                </NavItem>)
                            )
                        )}
                    </ContextMP.Consumer>
                </Nav>
            )}
        </ContextProduct.Consumer>
    )

}