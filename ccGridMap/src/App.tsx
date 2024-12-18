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
import packageJson from '../package.json';

function App() {
  const customTheme: CustomFlowbiteTheme = {
    tabs: {
      base: "flex flex-col",
      tablist: {
        base: "flex text-center justify-center mt-6",
        tabitem: {
          styles: {
            pills: {
              base: "h-full",
            },
          },
        },
      },
      tabitemcontainer: {
        base: "",
      },
      tabpanel: "",
    },
    tooltip: {
      target: "w-full",
    },
  };
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Navbar
        className="h-16 border-b border-gray-200 dark:border-gray-700"
        fluid
      >
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            ccGridMap
          </span>
        </Navbar.Brand>
        <div className="flex items-center">
          <DarkThemeToggle />
          <a
            className="ml-4"
            href="https://ydk.vc/ccgridmap"
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
                v{packageJson.version}
              </span>
            </Button>
          </a>
        </div>
      </Navbar>
      <main className="overflow-y-auto">
        <Tabs aria-label="Setting" style="pills">
          <Tabs.Item active title="Grid Map" icon={TbMap}>
            <GridMap />
          </Tabs.Item>
          <Tabs.Item
            disabled
            title="Grid Items"
            icon={TbCubeUnfolded}
          ></Tabs.Item>
        </Tabs>
      </main>
    </Flowbite>
  );
}

export default App;
