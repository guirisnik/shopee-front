import React from 'react'
import { arrayOf, string, func } from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'

const propTypes = {
  headers: arrayOf(string.isRequired),
  rows: arrayOf(arrayOf(string.isRequired)),
  handleClickRow: func,
}

function MaterialTableTemplate({
  headers = [''],
  rows = [['']],
  handleClickRow = (event) => {},
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='sales table'>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell align='left'>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              style={{ cursor: 'pointer ' }}
              hover
              onClick={handleClickRow}
              key={row.id}
            >
              {row.data.map((cell) => (
                <TableCell align='left' id={row.id}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { MaterialTableTemplate }
