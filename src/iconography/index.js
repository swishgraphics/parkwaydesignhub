// ════════════════════════════════════════════════════════════════════
// Iconography — Parkway's official icon set is Phosphor.
// Deep-import every icon (one module per icon) so Vite never has to
// crawl the full barrel and can tree-shake cleanly.
// ════════════════════════════════════════════════════════════════════

// ── chrome / UI ─────────────────────────────────────────────────────
import { MagnifyingGlass }  from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import { X }                from "@phosphor-icons/react/dist/csr/X";
import { CaretRight }       from "@phosphor-icons/react/dist/csr/CaretRight";
import { CaretDown }        from "@phosphor-icons/react/dist/csr/CaretDown";
import { ArrowRight }       from "@phosphor-icons/react/dist/csr/ArrowRight";
import { ArrowUpRight }     from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { Copy }             from "@phosphor-icons/react/dist/csr/Copy";
import { Check }            from "@phosphor-icons/react/dist/csr/Check";
import { DownloadSimple }   from "@phosphor-icons/react/dist/csr/DownloadSimple";

// ── rail (module) icons ─────────────────────────────────────────────
import { BookOpen }         from "@phosphor-icons/react/dist/csr/BookOpen";
import { SquaresFour }      from "@phosphor-icons/react/dist/csr/SquaresFour";
import { Swatches }         from "@phosphor-icons/react/dist/csr/Swatches";
import { FolderOpen }       from "@phosphor-icons/react/dist/csr/FolderOpen";

export {
  MagnifyingGlass, X, CaretRight, CaretDown, ArrowRight, ArrowUpRight,
  Copy, Check, DownloadSimple,
};

// Rail module icon-key → component
export const RAIL_ICONS = { BookOpen, SquaresFour, Swatches, FolderOpen };

// ── curated showcase for the Icons page ─────────────────────────────
import { House }          from "@phosphor-icons/react/dist/csr/House";
import { User }           from "@phosphor-icons/react/dist/csr/User";
import { Gear }           from "@phosphor-icons/react/dist/csr/Gear";
import { Bell }           from "@phosphor-icons/react/dist/csr/Bell";
import { Heart }          from "@phosphor-icons/react/dist/csr/Heart";
import { Star }           from "@phosphor-icons/react/dist/csr/Star";
import { ChatCircle }     from "@phosphor-icons/react/dist/csr/ChatCircle";
import { Envelope }       from "@phosphor-icons/react/dist/csr/Envelope";
import { Calendar }       from "@phosphor-icons/react/dist/csr/Calendar";
import { Clock }          from "@phosphor-icons/react/dist/csr/Clock";
import { Trash }          from "@phosphor-icons/react/dist/csr/Trash";
import { PencilSimple }   from "@phosphor-icons/react/dist/csr/PencilSimple";
import { Plus }           from "@phosphor-icons/react/dist/csr/Plus";
import { Link }           from "@phosphor-icons/react/dist/csr/Link";
import { Lock }           from "@phosphor-icons/react/dist/csr/Lock";
import { Eye }            from "@phosphor-icons/react/dist/csr/Eye";
import { EyeSlash }       from "@phosphor-icons/react/dist/csr/EyeSlash";
import { Cloud }          from "@phosphor-icons/react/dist/csr/Cloud";
import { Sun }            from "@phosphor-icons/react/dist/csr/Sun";
import { Moon }           from "@phosphor-icons/react/dist/csr/Moon";
import { Image }          from "@phosphor-icons/react/dist/csr/Image";
import { File }           from "@phosphor-icons/react/dist/csr/File";
import { Folder }         from "@phosphor-icons/react/dist/csr/Folder";
import { Tag }            from "@phosphor-icons/react/dist/csr/Tag";
import { Bookmark }       from "@phosphor-icons/react/dist/csr/Bookmark";
import { Flag }           from "@phosphor-icons/react/dist/csr/Flag";
import { Cube }           from "@phosphor-icons/react/dist/csr/Cube";
import { Lightning }      from "@phosphor-icons/react/dist/csr/Lightning";
import { Fire }           from "@phosphor-icons/react/dist/csr/Fire";
import { Camera }         from "@phosphor-icons/react/dist/csr/Camera";
import { Phone }          from "@phosphor-icons/react/dist/csr/Phone";
import { Globe }          from "@phosphor-icons/react/dist/csr/Globe";
import { CreditCard }     from "@phosphor-icons/react/dist/csr/CreditCard";
import { ShoppingCart }   from "@phosphor-icons/react/dist/csr/ShoppingCart";
import { MapPin }         from "@phosphor-icons/react/dist/csr/MapPin";
import { Rocket }         from "@phosphor-icons/react/dist/csr/Rocket";

export const CURATED = [
  ["House", House], ["User", User], ["Gear", Gear], ["Bell", Bell],
  ["MagnifyingGlass", MagnifyingGlass], ["Heart", Heart], ["Star", Star],
  ["ChatCircle", ChatCircle], ["Envelope", Envelope], ["Calendar", Calendar],
  ["Clock", Clock], ["Trash", Trash], ["PencilSimple", PencilSimple],
  ["Plus", Plus], ["Check", Check], ["X", X], ["ArrowRight", ArrowRight],
  ["CaretRight", CaretRight], ["DownloadSimple", DownloadSimple], ["Link", Link],
  ["Lock", Lock], ["Eye", Eye], ["EyeSlash", EyeSlash], ["Cloud", Cloud],
  ["Sun", Sun], ["Moon", Moon], ["Image", Image], ["File", File],
  ["Folder", Folder], ["Tag", Tag], ["Bookmark", Bookmark], ["Flag", Flag],
  ["Cube", Cube], ["Lightning", Lightning], ["Fire", Fire], ["Camera", Camera],
  ["Phone", Phone], ["Globe", Globe], ["CreditCard", CreditCard],
  ["ShoppingCart", ShoppingCart], ["MapPin", MapPin], ["Rocket", Rocket],
];
