const initialState = {
  accessToken: '',
  personalData: {

  },
  authorized: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.data
      };

    case 'SET_PERSONAL_DATA':
      return {
        ...state,
        personalData: action.data,
        authorized: true
      }
    
    default:
      return state;
  }
}
