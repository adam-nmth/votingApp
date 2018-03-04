const initialState = {
  all: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    
    case 'SET_POLLS':
      return {
        ...state,
        all: action.data
      };
    
    default:
      return state;
  }
}
