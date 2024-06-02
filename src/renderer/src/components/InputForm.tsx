import { useEffect, useState } from 'react'
import InputBox from './InputBox'
import Button from '@mui/material/Button'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { TextField, ThemeProvider, createTheme } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useFormStore } from '@renderer/store/FormStore'
import { useItemStore } from '@renderer/store/ItemStore'
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Outlined
          '& .MuiOutlinedInput-root': {
            color: '#000',
            fontFamily: 'Arial',
            fontWeight: 'regular',
            backgroundColor: '#FFF',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4e4e4e',
              borderWidth: '1px'
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main',
                borderWidth: '3px'
              }
            },
            '&:hover:not(.Mui-focused)': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ccc'
              }
            }
          },
          '& .MuiInputLabel-outlined': {
            color: '#2e2e2e',
            fontWeight: 'bold',
            '&.Mui-focused': {
              color: 'secondary.main'
            }
          },
          // Filled
          '& .MuiFilledInput-root': {
            color: '#000',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: '#e7e7e7',
            borderTopLeftRadius: '7px',
            borderTopRightRadius: '7px',
            '&:before': {
              borderColor: '#2e2e2e',
              borderWidth: '2px'
            },
            '&:after': {
              borderColor: 'secondary.main',
              borderWidth: '3px'
            },
            ':hover:not(.Mui-focused)': {
              '&:before': {
                borderColor: '#e7e7e7',
                borderWidth: '2px'
              },
              backgroundColor: '#f4f4f4'
            }
          },
          '& .MuiInputLabel-filled': {
            color: '#2e2e2e',
            fontWeight: 'bold',
            '&.Mui-focused': {
              color: 'secondary.main'
            }
          },
          // Standard
          '& .MuiInput-root': {
            color: '#000',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            '&:before': {
              borderColor: '#2e2e2e',
              borderWidth: '2px'
            },
            '&:after': {
              borderColor: 'secondary.main',
              borderWidth: '3px'
            },
            ':hover:not(.Mui-focused)': {
              '&:before': {
                borderColor: '#e7e7e7',
                borderWidth: '2px'
              }
            }
          }
        }
      }
    }
  }
})

export default function InputForm(): JSX.Element {
  const { title, date, setDate, setTitle } = useFormStore()
  const { addItem, removeItem, items, resetItems } = useItemStore()
  const resetAll = () => {
    resetItems()
    setTitle('')
    setDate(new Date())
  }
  return (
    <ThemeProvider theme={theme}>
      {/* <Button onClick={() => console.log(items)}>Get Data</Button>
      <Button onClick={resetAll}>Reset Data</Button> */}
      <form action="" onSubmit={(e) => e.preventDefault()} className="flex flex-col ">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} className="p-4">
            <Grid container spacing={2} marginBottom={'1em'}>
              <Grid item xs={9} sm={9}>
                <TextField
                  id={title}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Judul"
                  sx={{ width: '100%' }}
                ></TextField>
              </Grid>
              <Grid item xs={3}>
                <DatePicker
                  value={date}
                  onChange={(date) => setDate(date!)}
                  label="Tanggal Invoice"
                  format="dd/MM/yyyy"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mb-3">
              <Grid item xs={8}>
                <InputBox
                  title="Item"
                  inputType="text"
                  id={items[0].id}
                  value={items[0].itemName}
                />
              </Grid>
              <Grid item xs={2}>
                <InputBox
                  title="Jumlah"
                  inputType="number"
                  id={items[0].id}
                  value={items[0].quantity.toString()}
                />
              </Grid>
              <Grid item xs={2} sm={2} className="flex justify-center items-center">
                <Button title="Add" variant="contained" onClick={addItem} className="flex h-full">
                  <ControlPointIcon />
                </Button>
              </Grid>
            </Grid>
            {items.map((x) =>
              x.id == 1 ? (
                <></>
              ) : (
                <Grid container spacing={2} key={x.id} className="mb-3">
                  <Grid item xs={8}>
                    <InputBox title="Item" inputType="text" id={x.id} value={x.itemName} />
                  </Grid>
                  <Grid item xs={2}>
                    <InputBox
                      title="Jumlah"
                      inputType="number"
                      id={x.id}
                      value={x.quantity.toString()}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} className="flex justify-center items-center">
                    <Button
                      title="Delete"
                      variant="contained"
                      color="error"
                      onClick={() => removeItem(x.id)}
                      className="flex h-full"
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </Grid>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </form>
    </ThemeProvider>
  )
}
