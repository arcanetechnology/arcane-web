# @arcane-web/alchemy

solid-js based component library for arcane. This component library is highly composable and uses Html5 native components to do as much work as possible.  


## SolidJS Typescript CheatSheet
---

*Get predefined interface for components*
```
import {JSX} from 'solid-js';
type CustomProps = ...
type ButtonProps = CustomProps & JSX.ButtonHTMLAttributes<HTMLButtonElement> // piggyback on inbuild jsx button props for better control and flexibility
```

