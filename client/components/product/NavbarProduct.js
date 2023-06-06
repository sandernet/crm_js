import { Nav, NavItem, NavLink } from 'reactstrap';
import ContextProduct from './ContextProduct';
import ContextMP from './ContextMP';


export default function NavbarProduct({ children }) {
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
                                    <NavLink href={`${context?.id}/${item?.id}`}>
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