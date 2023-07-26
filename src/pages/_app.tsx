import type { AppProps } from "next/app";
import RootStore from "@/controducer";
import TodosController from "@/controducer/TodosController";
import TodoDetailController from "@/controducer/TodoDetailController";
import StatusController from "@/controducer/StatusController";

// Import Css
import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Add fontawesome icons
import { config } from "@fortawesome/fontawesome-svg-core";
import { Loading } from "@/components";
import AddTodoPopupController from "@/controducer/AddTodoPopupController";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootStore>
      <TodosController>
        <TodoDetailController>
          <AddTodoPopupController>
            <StatusController>
              <Component {...pageProps} />

              <Loading />
            </StatusController>
          </AddTodoPopupController>
        </TodoDetailController>
      </TodosController>
    </RootStore>
  );
}
