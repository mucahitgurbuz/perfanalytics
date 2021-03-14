import React from 'react';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';

export interface LayoutProps {
    children: React.ReactNode[]
}

const Layout: React.SFC<LayoutProps> = ({ children }) => (
    <div id="app">
        <Header />
        <Body>{children}</Body>
        <Footer />
    </div>
);


export default Layout;
