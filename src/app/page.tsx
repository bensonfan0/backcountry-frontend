"use client";

import { fetchTrailData, putTrailData } from '../../rest/restapi';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import DataTable, { Data } from './dataTable';
import Link from 'next/link'
import { delay } from '../../utility/utilityfunctions';

export interface FormData {
  name: string;
  location: string;
  length: string;
  [key: string]: string;
}

export default function Home() {

  const [traildata, setdata] = useState({
    data: [],
  });

  const [formData, setFormData] = useState<FormData>({
    name: 'Panorama Ridge',
    location: 'Whistler',
    length: '4 days'
  });

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (): Promise<void> => {
    try {
      const data: any = await fetchTrailData()
      const newTrailData = {
        data: data
      }
      setdata(newTrailData)
    } catch (error: any) {
      console.error('Error fetching data:', error)
    }
  }

  const putData = async (): Promise<void> => {
    try {
      let toAdd: any = {
        data:[],
      }
      const data: any = await fetchTrailData() // use only the freshest data
      toAdd.data = data
      toAdd.data.push(formData)
      putTrailData(toAdd)
    } catch (error: any) {
      console.error('Error fetching data:', error)
    }
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    let key: string = name
    formData[key] = value
    setFormData(formData);
  }

  const doSubmit = async (event: any) => {
    event.preventDefault();
    putData()
    await delay(2000)
    fetchData() // update the table after 1000 ms
  }

  const constructRows = () => {
    const rowTemp: Data[] = []
    traildata.data.forEach((data: any, i: number) => {
      rowTemp.push({
        id: i,
        name: data.name,
        length: data.length,
        location: data.location,
      })
    })
    return rowTemp
  }

  const getInputForm = () => {
    return <form onSubmit={doSubmit}>
      <div className="pb-5">
        <TextField label="Name" variant="outlined"
          type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="pb-5">
        <TextField label="Length" variant="outlined"
          type="length"
          id="length"
          name="length"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="pb-5">
        <TextField label="Location" variant="outlined"
          id="location"
          name="location"
          onChange={handleInputChange}
          required
        />
      </div>
      <Button variant="outlined" type="submit">Submit</Button>
    </form>
  }

  // 12 cols per row
  return (
    <Grid container spacing={3} className="w-full min-h-screen p-10">
      <Grid xs={12}>
        <Link href="/inventory" className="hover:bg-blue-500 transition duration-300 ease-in-out">Inventory Planning</Link>
      </Grid>
      <Grid xs={3}>
        <p className="font-mono text-lg pb-10">Backcountry Camping Ideas</p>
        {getInputForm()}
      </Grid>
      <Grid xs={9}>Todo: add map</Grid>
      <Grid xs={12}>
        <main className="flex flex-col items-center justify-between p-24">
          <div className="pb-10">
            <Button variant="outlined" onClick={fetchData}>fetch Data</Button>
          </div>
          <DataTable _rows={constructRows()}/>
        </main>
      </Grid>
    </Grid>
  );
}