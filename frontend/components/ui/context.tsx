import React, { useContext, useMemo, useReducer } from 'react'

export interface State {
  displayModal: boolean
  authView: string
  modalView: string
}

const initialState: State = {
  displayModal: false,
  authView: 'LOGIN_VIEW',
  modalView: 'PRODUCT_FORM',
}

type AUTH_VIEWS = 'LOGIN_VIEW' | 'SIGNUP_VIEW'
type MODAL_VIEWS = 'PRODUCT_FORM' | 'PRODUCT_MASSIVE' | 'CONFIRM'

type Action =
  | {
      type: 'OPEN_MODAL'
    }
  | {
      type: 'CLOSE_MODAL'
    }
  | {
      type: 'SET_AUTH_VIEW'
      view: AUTH_VIEWS
    }
  | {
      type: 'SET_MODAL_VIEW'
      view: MODAL_VIEWS
    }

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

const uiReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        displayModal: true,
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        displayModal: false,
      }
    case 'SET_MODAL_VIEW':
      return {
        ...state,
        modalView: action.view,
      }
    case 'SET_AUTH_VIEW':
      return {
        ...state,
        authView: action.view,
      }
  }
}

export const UIProvider: React.FC = props => {
  const [state, dispatch] = useReducer(uiReducer, initialState)

  const openModal = () => dispatch({ type: 'OPEN_MODAL' })
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  const setAuthView = (view: AUTH_VIEWS) =>
    dispatch({ type: 'SET_AUTH_VIEW', view })

  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: 'SET_MODAL_VIEW', view })

  const value = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      setAuthView,
      setModalView,
    }),
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
