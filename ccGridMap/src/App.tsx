import {
  Flowbite,
  CustomFlowbiteTheme,
  Button,
  DarkThemeToggle,
  Navbar,
  Tabs,
} from "flowbite-react";
import { FaGithubAlt, FaMagnifyingGlass } from "react-icons/fa6";
import { TbCubeUnfolded, TbMap } from "react-icons/tb";
import GridMap from "./GridMap/GridMap";

function App() {
  const customTheme: CustomFlowbiteTheme = {
    tabs: {
      base: "flex flex-col",
      tablist: {
        base: "flex text-center justify-center py-3 h-20",
      },
      tabitemcontainer: {
        base: "overflow-y-scroll",
      },
      tabpanel: ""
    },
  };
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Navbar className="border-b border-gray-200 dark:border-gray-700 h-16" fluid>
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            ccGridMap
          </span>
        </Navbar.Brand>
        <div className="flex items-center">
          <DarkThemeToggle />
          <a
            className="ml-4"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color="light" size="xs">
              <span className="flex items-center">
                <FaMagnifyingGlass className="mr-2" />
                使い方
              </span>
            </Button>
          </a>
          <a
            className="ml-4"
            href="https://github.com/yudukiak/ccGridMap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color="light" size="xs">
              <span className="flex items-center">
                <FaGithubAlt className="mr-2" />
                v1.0.0
              </span>
            </Button>
          </a>
        </div>
      </Navbar>
      <main>
        <Tabs aria-label="Setting" style="pills">
          <Tabs.Item active title="Grid Map" icon={TbMap}>
            <GridMap />
          </Tabs.Item>
          <Tabs.Item disabled title="Grid Items" icon={TbCubeUnfolded}>

          </Tabs.Item>
        </Tabs>
      </main>
    </Flowbite>
  );
}

export default App;
