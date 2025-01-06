"use client";

import { fetchTrailData, putTrailData } from '../../rest/restapi';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import DataTable, { Data } from '../components/table/dataTable';
import Link from 'next/link'
import { delay } from '../../utility/utilityfunctions';
import styled from 'styled-components';

export interface FormData {
  name: string;
  location: string;
  length: string;
  [key: string]: string;
}

const StyledDiv = styled.div`
  color: white;
`;

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
        data: [],
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
      <StyledDiv className="pb-5">
        <TextField
          label="Name"
          variant="standard"
          type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
          required
        />
      </StyledDiv>
      <StyledDiv className="pb-5">
        <TextField
          label="Length"
          variant="standard"
          type="length"
          id="length"
          name="length"
          onChange={handleInputChange}
          required
        />
      </StyledDiv>
      <StyledDiv className="pb-5">
        <TextField
          label="Location"
          variant="standard"
          id="location"
          name="location"
          onChange={handleInputChange}
          required
        />
      </StyledDiv>
      <Button variant="outlined" type="submit">Submit</Button>
    </form>
  }

  // 12 cols per row
  return (
    <Grid container spacing={3} className="p-10 h-screen">
      <Grid size={3}>
        <p className="font-mono text-lg pb-10">Backcountry Camping Ideas</p>
        {getInputForm()}
        <Button variant="outlined" onClick={fetchData} sx={{ margin: '10px 0 0 0'}}>fetch Data</Button>
      </Grid>
      <Grid size={9}>
        <main className="flex flex-col items-center justify-between p-24">
          <div className="pb-10">
          </div>
          <DataTable _rows={constructRows()} />
        </main>
      </Grid>
    </Grid>
  );
}