import {CREATE_COMMENT_LOAD, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAIL, RESET_NEW_COMMENTS} from '../actions/index';

const INITIAL_STATE = {
  newComments: {
    comments: [],
    error: null,
    loading: false
  }
};

export default function (state = INITIAL_STATE, action) {
  console.log('HERES THE INITIAL_STATE IN COMMENT REDUCER', INITIAL_STATE)
  console.log('got a comment  action', action)

  let error;

  switch (action.type) {

    case CREATE_COMMENT_LOAD:
      console.log('creaComment LOad');
      return Object.assign({}, state, {
        newComments: {
          comments: [...state.newComments.comments],
          error: null,
          loading: true
        }
      });
    case CREATE_COMMENT_SUCCESS:
      console.log('create comment success', action.payload.data)
      return Object.assign({}, state, {
        newComments: {
          comments: [
            ...state.newComments.comments,
            action.payload.data
          ],
          error: null,
          loading: false
        }
      });
    case CREATE_COMMENT_FAIL:
      console.log('CREATE COMENT FAIL ', action.payload)
      error = action.payload;
      return Object.assign({}, state, {
        newComments: {
          comments: [...state.newComments.comments],
          error: error,
          loading: false
        }
      });
      // reset newcomments state whenever you chagne View component and the component
      // unmounts
    case RESET_NEW_COMMENTS:
      console.log('resetting newComments from state')
      return Object.assign({}, state, {
        newComments: {
          comments: [],
          error: null,
          loading: false
        }
      });

    default:
      return state;
  }

} //end export default func