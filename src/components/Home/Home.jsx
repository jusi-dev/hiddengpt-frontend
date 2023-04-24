import React from 'react';
import { Helmet } from 'react-helmet';

class Home extends React.Component{

    render() {
        return (
            <div className='home flex bg-cyan-400 p-5 pl-20'>
                <Helmet>
                    <title>Stuff-Explained</title>
                </Helmet>
                <div className='flex flex-col'>
                    <h1 className='text-3xl text-white font-bold'>A place for all related topics!</h1>
                    <p className='text-white text-lg'>Stuff-Explained is a place where knowledge of different topics is combined to one single website. <br></br>Get informations
                        related to math, IT and many more!
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;