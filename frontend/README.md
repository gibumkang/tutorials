## Connecting Nextjs to Strapi

#### Download all dependencies
For this tutorial, you need the following:
* @emotion/core @emotion/styled @emotion/react or styled-components
* dotenv to configure next.config.js file
* isomorphic fetch and isomorphic unfetch

#### Set up next.config.js file
Within the file, make sure to call to the .env file which points to where the server is located.

#### How to use data from strapi within nextjs
In your page, use the following command:
```jsx
export async function getServerSideProps(){
    const {API_URL} = process.env //destructure
    const res = await fetch(`${API_URL}/movies`)
    const data = await res.json()

    return {
        props: {
            category: data //replace category with your category. in this example it's movies
        }
    }
}
```

#### How to add active link to nextjs
```jsx
    <Link href="/about">
        <a className={router.pathname === '/about' ? 'active' : ''}>About</a>
    </Link>
    <Link href="/contact">
        <a className={router.pathname === '/contact' ? 'active' : ''}>Contact</a>
    </Link>
```
Of course, if you are fetching your links from an API, you don't need to repeat these.

#### dynamic routing in nextjs
Refer to the [slug].js page. Note: You cannot have more than one dynamically generated pages in the same directory. They must be added in the pages folder, and within there you can have more subfolders based on what type of directory you are building. Dynamically generating pages depends on whether you are using static generation or serverside. In this example, we use serverside and isomorphic fetch to fetch the data from the API. This procedure is very standard:
```jsx
fetch(`${API_URL}/my-category/${id}`)
```
Once you have your data, you can expose it to the component and dynamically generate your pages.

#### Easily nest dynamic routes
You can nest dynamic routes by naming your folder with brackets. For example, if you want a url to be like:
example.com/movies/scifi/inception

Your directory will look like
pages
 movies
  [genre]
    [slug].js

Don't forget to make the correct endpoint connections in order to navigate through your data effectively.