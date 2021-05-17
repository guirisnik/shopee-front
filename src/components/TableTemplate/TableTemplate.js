import React from 'react'
import { arrayOf, string, func } from 'prop-types'
import { Table } from 'semantic-ui-react'

const propTypes = {
  headers: arrayOf(string.isRequired),
  rows: arrayOf(arrayOf(string.isRequired)),
  handleClickRow: func,
}

const TableTemplate = ({
  headers = [''],
  rows = [['']],
  handleClickRow = (event) => {},
}) => (
  <Table selectable striped>
    <Table.Header>
      <Table.Row>
        {headers.map((headerCell) => (
          <Table.HeaderCell>{headerCell}</Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {rows.map((row) => (
        <Table.Row onClick={handleClickRow}>
          {row.data.map((cell) => (
            <Table.Cell id={row.id}>{cell}</Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

Table.propTypes = propTypes

export { TableTemplate }
