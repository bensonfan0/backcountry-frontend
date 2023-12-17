import axios from 'axios';

export const fetchTrailData = async (): Promise<void> => {
    console.log("FETCHING!")
    let data: any = []
    try {
        let resp = await axios.get("https://b7h8ruabg7.execute-api.us-east-1.amazonaws.com/test/fetch-trail-data")
        console.log("GOOD FETCH")
        data = resp.data
        data = data.data // traildata format is {data:[]}
    } catch (error: any) {
      console.error('Error fetching data:', error)
    }
    return data
  }

// The api actually functions as a post HTTP request
export const putTrailData = async (data: any): Promise<void> => {
  console.log("POSTING!")
    try {
      axios.put("https://njh0e97s74.execute-api.us-east-1.amazonaws.com/test/put-trail-data", data).then((response: any) => {
        console.log("GOOD PUT")
      }).catch((error: any) => {
        console.error(error)
      })
    } catch (error: any) {
      console.error('Error fetching data:', error)
    }
  }