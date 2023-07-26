const {
  createStoreConfig,
  createController,
  useStore,
  useDispatch,
} = require("react-controducer");

export const statusConfig = createStoreConfig({
  name: "common",
  path: "common",
  initialState: { loading: false, showSnackbar: false },
  reducers: {
    HANDLE_LOADING: (store: any, data: any) => {
      return { loading: data };
    },
    SET_SHOW_SNACKBAR: (store: any, data: any) => {
      return { showSnackbar: data };
    },
    HANDLE_SAVE_SUCCESSFUL: (store: any, data: any) => {
      console.log(data);
      return {
        loading: data?.showLoading,
        showSnackbar: data?.showSnackbar,
      };
    },
  },
});

const StatusController = createController(statusConfig, (props: any) => {
  const commonStore = useStore((rootStore: any) => {
    return rootStore.common;
  });

  const [dispatch, commonActions] = useDispatch(statusConfig?.name);

  return {
    loading: commonStore?.loading,
    handleLoading: (data: any) => {
      dispatch(commonActions.HANDLE_LOADING(data));
    },
    showSnackbar: commonStore?.showSnackbar,
    onCloseSnackbar: () => {
      dispatch(commonActions.SET_SHOW_SNACKBAR(false));
    },
  };
});

export default StatusController;
