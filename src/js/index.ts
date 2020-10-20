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

    created() {
        this.GetAll()
    },

    methods: {
        //Metode der viser listen af bøger
        GetAll() {
            this.HelpGetAndShow(baseUrl)
        },

        //Metoden der hjælper GetAll med vise listen af bøger
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

        //Metode der fremviser 1 bog fra listen, ved at skrive dens id i boksen
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

        //Med addBook() kan man poste sine egne bøger til listen/library. 
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

        //Med updateBook kan man opdatere en bog, hvis man vil ændre på dens titel, pris, udgiver eller forfatter
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

        //Med deleteBook kan man slette en bog fra listen, ved at skrive dens id i boksen
        deleteBook(deleteId: number) {
            let url: string = baseUrl + "/" + deleteId
            console.log(url)

            axios.delete<void>(url)
                .then((response: AxiosResponse<void>) => {
                    console.log(response.status)
                    this.deleteMessage = response.status + " " + response.statusText
                    this.GetAll()
                })
                .catch((error: AxiosError) => {
                    console.log(error.message)
                    alert(error.message)
                })
        }

    }
})