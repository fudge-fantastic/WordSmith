// NOTE: This will only return data from the content_api

import { json } from "@remix-run/react"
import fetchSomeData from "./content_api"

export async function loader() {

    const data = await fetchSomeData()
    // you can add your custom status code as well
    return json(data, {status: 200})
}