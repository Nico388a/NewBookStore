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

        addData: { title: "", author: "", publisher: "", price: 0 },
        addMessage: "",

        deleteId: 0,
        deleteMessage: "",

        updateData: { id: 0, title: "", author: "", publisher: "", price: 0 },
        updateMessage: ""


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

        //response message viser status på http fx. om den er 200 ok eller over 400 ikke ok

        addBook() {
            axios.post<number>(baseUrl, this.addData)
                .then((response: AxiosResponse) => {
                    let message: string = "response" + response.status + " " + response.statusText
                    this.addMessage = message
                    this.GetAll()
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                }
                )
        },


        updateBook() {
            let url: string = baseUrl + "/" + this.updateData.id

            axios.put<number>(url, this.updateData)
                .then((response: AxiosResponse) => {

                    let message: string = "response" + response.status + " " + response.statusText
                    this.updateMessage = message
                    this.GetAll()
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        },

        deleteBook(deleteId: number) {
            let url: string = baseUrl + "/" + deleteId

            axios.delete<void>(url)
                .then((response: AxiosResponse<void>) => {
                    this.deleteMessage = response.status + " " + response.statusText
                    this.GetAll()
                })
                .catch((error: AxiosError) => {
                    alert(error.message)
                })
        }








    }
})