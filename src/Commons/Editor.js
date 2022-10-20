import React, { useCallback, useMemo, useState, useEffect } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";
import ReactDOM from "react-dom";
import SuggestionList from "./suggestionList";

const items = [
  "United States",
  "Canada",
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and/or Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia (Hrvatska)",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecudaor",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "France, Metropolitan",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard and Mc Donald Islands",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, Democratic People's Republic of",
  "Korea, Republic of",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfork Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "St. Helena",
  "St. Pierre and Miquelon",
  "Sudan",
  "Suriname",
  "Svalbarn and Jan Mayen Islands",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States minor outlying islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City State",
  "Venezuela",
  "Vietnam",
  "Virigan Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna Islands",
  "Western Sahara",
  "Yemen",
  "Yugoslavia",
  "Zaire",
  "Zambia",
  "Zimbabwe",
];

var curSuggestions = [];
var curSuggestionIdx = 0;

const suggestions = (val) => {
  if (val.length === 0) return [];
  val = val.toLowerCase();
  return items.filter((item) => item.toLowerCase().indexOf(val) === 0);
};

const MenuButton = styled.span`
  cursor: pointer;
  color: ${(props) =>
    props.reversed
      ? props.active
        ? "white"
        : "#aaa"
      : props.active
      ? "black"
      : "#ccc"};
`;

const MenuDiv = styled.div`
  position: relative;
  border-bottom: 2px solid #eee;
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

const Toolbar = React.forwardRef(({ ...props }, ref) => (
  <MenuDiv {...props} ref={ref} />
));

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

function RichTextEditor({ value, setValue }) {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [flag, setFlag] = React.useState(false);
  const [cursorPosition, setCursorPosition] = React.useState(null);
  let counter = 0;

  React.useEffect(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    setCursorPosition(sel.getRangeAt(0).getBoundingClientRect());
  }, [value]);

  return (
    <React.Fragment>
      {curSuggestions.length !== 0 ? (
        <SuggestionList
          suggestionItems={curSuggestions}
          suggestionIdx={curSuggestionIdx}
          position={cursorPosition}
        />
      ) : null}
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
              console.log(value);
              if (event.key === "e" && event.ctrlKey) {
                event.preventDefault();
                console.log("escape key pressed");
                curSuggestions = [];
                curSuggestionIdx = 0;
              } else if (
                event.key === "ArrowDown" ||
                (event.key === "Tab" && !event.shiftKey)
              ) {
                if (curSuggestions.length !== 0) {
                  event.preventDefault();
                  counter = (counter + 1) % 3;
                  if (counter === 0) {
                    curSuggestionIdx =
                      (curSuggestionIdx + 1) % curSuggestions.length;
                    setFlag(!flag);
                  }
                }
              } else if (
                event.key === "ArrowUp" ||
                (event.key === "Tab" && event.shiftKey)
              ) {
                if (curSuggestions.length !== 0) {
                  event.preventDefault();
                  counter = (counter + 1) % 3;
                  if (counter === 0) {
                    curSuggestionIdx =
                      (curSuggestionIdx - 1 + curSuggestions.length) %
                      curSuggestions.length;
                    setFlag(!flag);
                  }
                }
              } else {
                const curLine = editor.selection.anchor.path[0];
                console.log("curLine", curLine);
                let x = value[curLine];
                console.log("value of line", x);
                while (x.children) x = x.children[x.children.length - 1];
                var val = x.text;
                console.log("val", val);
                if (event.key === "Backspace") {
                  console.log("backspace pressed");
                  if (val.length !== 0) {
                    const myArray = val.slice(0, val.length - 1).split(" ");
                    val = myArray[myArray.length - 1];
                    curSuggestions = suggestions(val);
                    curSuggestionIdx = 0;
                  }
                }
                if (curSuggestions.length !== 0 && event.key === "Enter") {
                  event.preventDefault();
                  const myArray = val.split(" ");
                  const myArrayLen = myArray.length;
                  const curWord = myArray[myArrayLen - 1];
                  const curWordLen = curWord.length;
                  console.log(curWord, curWordLen);
                  for (let i = 0; i < curWordLen; i++) {
                    editor.deleteBackward();
                  }
                  editor.insertText(curSuggestions[curSuggestionIdx] + " ");
                  curSuggestions = [];
                  curSuggestionIdx = 0;
                } else if (event.key.length === 1) {
                  if (event.key === " ") {
                    curSuggestions = [];
                    curSuggestionIdx = 0;
                  } else {
                    val += event.key;
                    const myArray = val.split(" ");
                    val = myArray[myArray.length - 1];
                    const mySuggestions = suggestions(val);
                    curSuggestions = mySuggestions;
                  }
                }
              }
            }
          }}
        />
      </Slate>
    </React.Fragment>
  );
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) Editor.removeMark(editor, format);
  else Editor.addMark(editor, format, true);
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, { match: (n) => n.type === format });
  return !!match;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <MenuButton
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </MenuButton>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <MenuButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </MenuButton>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "!" },
    ],
  },
];

const RichTextReadOnly = ({ value }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Slate editor={editor} value={value} onChange={(value) => {}}>
      <Editable readOnly placeholder="Enter some plain text..." />
    </Slate>
  );
};

export default RichTextEditor;
export { RichTextReadOnly };
