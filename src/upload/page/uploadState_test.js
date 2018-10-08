
// Test upload state.
// Work in progress.

const fileObj = new File()

const initialState = { [] }
const oneFileState = {[
  id: 'oneFileId',
  fileList: [fileObj],
]}

describe('fileList reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

/*
  it('handles login request', () => {
    expect(reducer(initialState, { type: ACTION_LOGIN_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('handles login failure', () => {
    expect(reducer(initialState, { type: ACTION_LOGIN_FAILURE })).toEqual({
      ...initialState,
      loginError:
        'Sorry, it looks like the Username and/or Password you provided does not match our records',
    });
  });

  it('handles successful 1fa login', () => {
    expect(reducer(initialState, {
      type: STORE_PHONE_NUMBERS,
      payload: { phoneNumbers: ['8675309'] },
    })).toEqual({
      ...initialState,
      phoneNumbers: ['8675309'],
    });
  });
*/
}
