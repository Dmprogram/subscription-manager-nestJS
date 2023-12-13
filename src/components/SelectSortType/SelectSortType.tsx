import CloseRounded from '@mui/icons-material/CloseRounded'
import IconButton from '@mui/joy/IconButton'
import Option from '@mui/joy/Option'
import Select, { SelectStaticProps } from '@mui/joy/Select'
import * as React from 'react'

import { useRef } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks'
import { addSortByParameter } from '../store/subscriptionsSlice'

export const SelectSortType = () => {
  const windowWidth = useRef(window.innerWidth)
  const { sortByParameter } = useAppSelector((state) => state.subscriptionsList)
  const minWidth = windowWidth.current < 568 ? 120 : 160
  const dispatch = useAppDispatch()
  const action: SelectStaticProps['action'] = React.useRef(null)
  return (
    <Select
      color='neutral'
      variant='plain'
      action={action}
      value={sortByParameter}
      size={windowWidth.current < 568 ? 'sm' : 'md'}
      placeholder='Sort by...'
      onChange={(_, newValue) => {
        dispatch(addSortByParameter({ sortByParameter: newValue as string | null }))
      }}
      {...(sortByParameter && {
        endDecorator: (
          <IconButton
            size='sm'
            variant='plain'
            color='neutral'
            onMouseDown={(event) => {
              event.stopPropagation()
            }}
            onClick={() => {
              dispatch(addSortByParameter({ sortByParameter: null }))
              action.current?.focusVisible()
            }}
          >
            <CloseRounded />
          </IconButton>
        ),
        indicator: null,
      })}
      sx={{
        height: 2,
        minWidth,
      }}
    >
      <Option value='dateToOld'>Newest to Oldest</Option>
      <Option value='dateToNew'>Oldest to Newest</Option>
      <Option value='priceToHigh'>Price Low to High</Option>
      <Option value='priceToLow'>Price High to Low</Option>
      <Option value='alphabetToZ'>Alphabet to Z</Option>
      <Option value='alphabetToA'>Alphabet to A</Option>
    </Select>
  )
}
