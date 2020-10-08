import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IBook {
    id: number,
    tittle: string,
    author: string,
    publisher: string,
    price: number
}

let baseUrl: string = "http://anbo-bookstorerest.azurewebsites.net/api/Books"

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.

    el: "#app",
    data: {
        books: [],

        name: "",
        greeting: "",
        titleToGetBy: "",
        toGetById: -1,
        singleBook: null,
        deletedId: 0,


    },
    methods: {
        GetAll() {
            this.HelpGetAndShow(baseUrl)
        },

        HelpGetAndShow(url: string) {
            axios.get<IBook[]>(url)
                .then((response: AxiosResponse<IBook[]>) => {
                    console.log(response.data);
                    this.books = response.data
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                }
                )

        },

        getById(id: number) {
            let url: string = baseUrl + "/" + id
            axios.get<IBook>(url)
                .then((response: AxiosResponse<IBook>) => {
                    this.singleBook = response.data

                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                }
                )
        },






    }
})