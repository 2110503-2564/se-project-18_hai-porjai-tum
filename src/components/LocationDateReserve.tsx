import { Dayjs } from "dayjs"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select, MenuItem } from "@mui/material"
import { useState } from "react"

let count = false;

export default function LocationDateReserve({ onDateChange, onLocationChange, preset }
    : { onDateChange: Function, onLocationChange: Function, preset?: {date:Dayjs|null, location:string} }) {
    const [rentDate, setRentDate] = useState<Dayjs | null>(null)
    const [location, setLocation] = useState('BKK')
    if(preset && !count) { setRentDate(preset.date); setLocation(preset.location); count=true}
    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 
        flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white"
                    value={rentDate}
                    onChange={(value) => { setRentDate(value); onDateChange(value) }} />
            </LocalizationProvider>
            <Select variant="standard" name="location" id="location" className="k-[2em] w-[200px]" value={location}
                onChange={(e) => { setLocation(e.target.value); onLocationChange(e.target.value); }}>
                <MenuItem value="BKK">Bangkok</MenuItem>
                <MenuItem value="CNX">Chiang Mai</MenuItem>
                <MenuItem value="PKT">Phuket</MenuItem>
            </Select>
        </div>
    )
}