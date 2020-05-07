import Head from 'next/head'

const CommonHead =({title})=> {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title" />
                <link rel="stylesheet" crossOrigin="anonymous"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" />

                <link rel="stylesheet"  //Add font-awesome
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"/>  
            </Head>
        </div>
    )
}

  export default CommonHead;