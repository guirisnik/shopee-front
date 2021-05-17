import React, { useEffect, useState } from 'react'
import { func } from 'prop-types'
import firebase from 'src/firebase'
import { Button, CircularProgress } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { MaterialTableTemplate } from 'components/MaterialTableTemplate'
import { SELLERS } from 'src/constants/sellers'

Array.prototype.isEmpty = function isEmpty() {
  return this.length == 0
}

const propTypes = {
  navigate: func,
}

const MainSales = ({ navigate }) => {
  const [sales, setSales] = useState([])

  const toDate = (date = { seconds: 0, nanoseconds: 0 }) =>
    new Date(date.seconds * 1000)

  const parseDateOfSale = (dateOfSale) =>
    toDate(dateOfSale).toISOString().split('T')[0]

  const parseData = (data) => [
    data.seller,
    data.customer,
    parseDateOfSale(data.dateOfSale),
    data.item.name,
    data.item.value,
  ]

  const sortByHighestAmountSold = (sales) => {
    const getAmountSold = (seller) =>
      sales.reduce((acc, sale) => {
        acc += sale.data[0] == seller ? sale.data[4] : 0
        return acc
      }, 0)

    let amountMap = []

    for (let seller of SELLERS) {
      amountMap.push({ [seller]: getAmountSold(seller) })
    }

    return amountMap
      .sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
      .map((amount) =>
        sales.filter((sale) => sale.data[0] == Object.keys(amount)[0])
      )
      .flat()
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('sales')
      .get()
      .then((snapshot) =>
        setSales(
          sortByHighestAmountSold(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: parseData(doc.data()),
            }))
          )
        )
      )
      .catch(console.error)
  }, [])

  const headers = [
    'Seller',
    'Customer',
    'Date of sale',
    'Item name',
    'Item value',
  ]

  const toSaleForm = ({ seller, customer, dateOfSale, item }) => ({
    seller,
    customer,
    dateOfSale: parseDateOfSale(dateOfSale),
    itemName: item.name,
    itemValue: item.value,
  })

  const handleClickRow = (event) => {
    firebase
      .firestore()
      .collection('/sales')
      .doc(event.target.id)
      .get()
      .then((snapshot) =>
        navigate(`/sale/${event.target.id}`, {
          state: { sale: toSaleForm(snapshot.data()) },
        })
      )
      .catch(console.error)
  }

  return (
    <>
      {sales.isEmpty() ? (
        <CircularProgress />
      ) : (
        <>
          <MaterialTableTemplate
            headers={headers}
            rows={sales}
            handleClickRow={handleClickRow}
          />
          <Button
            style={{ marginTop: '10px', float: 'right' }}
            variant='contained'
            color='primary'
            size='small'
            startIcon={<Add />}
            onClick={() => navigate('/sale')}
          >
            New sale
          </Button>
        </>
      )}
    </>
  )
}

MainSales.propTypes = propTypes

export { MainSales }
