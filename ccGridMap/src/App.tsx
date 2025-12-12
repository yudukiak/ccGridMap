import {
  ThemeProvider,
  Button,
  DarkThemeToggle,
  Navbar,
  NavbarBrand,
  Tabs,
  TabItem,
} from "flowbite-react";
import type { FlowbiteTheme, DeepPartial } from "flowbite-react/types";
import { FaGithubAlt, FaMagnifyingGlass } from "react-icons/fa6";
import { TbCubeUnfolded, TbMap } from "react-icons/tb";
import GridMap from "./GridMap/GridMap";
import packageJson from '../package.json';

type CustomFlowbiteTheme = DeepPartial<FlowbiteTheme>;

function App() {
  const customTheme: CustomFlowbiteTheme = {
    tabs: {
      base: "flex flex-col",
      tablist: {
        base: "flex text-center justify-center mt-6",
        tabitem: {
          variant: {
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
    <ThemeProvider theme={customTheme}>
      <Navbar
        className="h-16 border-b border-gray-200 dark:border-gray-700"
        fluid
      >
        <NavbarBrand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            ccGridMap
          </span>
        </NavbarBrand>
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
        <Tabs aria-label="Setting" variant="pills">
          <TabItem active title="Grid Map" icon={TbMap}>
            <GridMap />
          </TabItem>
          <TabItem
            disabled
            title="Grid Items"
            icon={TbCubeUnfolded}
          ></TabItem>
        </Tabs>
      </main>
    </ThemeProvider>
  );
}

export default App;
