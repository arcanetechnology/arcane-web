# @arcane-web/alchemy

solid-js based design system of arcane 


## SolidJS Typescript CheatSheet
---

*Get predefined interface for components*
```
import {JSX} from 'solid-js';
type CustomProps = ...
type ButtonProps = CustomProps & JSX.ButtonHTMLAttributes<HTMLButtonElement> // piggyback on inbuild jsx button props for better control and flexibility
```

