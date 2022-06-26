import classNames from "classnames";
import { Action, RouteLookup } from "../../../../common/routes";
import { Area, Gem, Quest } from "../../../../common/types";
import "./Action.css";

interface ActionProps {
  action: Action;
  lookup: RouteLookup;
}

function EnemyComponent(enemy: string) {
  return <span className={classNames("enemy")}>{enemy}</span>;
}

function AreaComponent(area: Area) {
  return <span className={classNames("area")}>{area.name}</span>;
}

function QuestComponent(quest: Quest) {
  return (
    <>
      <img src="/images/quest.png" className={classNames("icon")} />
      <span className={classNames("quest")}> {quest.name}</span>
    </>
  );
}

function QuestRewardComponent(gem: Gem) {
  return (
    <>
      <span className={classNames(`gem-${gem.primary_attribute}`)}>⏺ </span>
      <span>Take </span>
      <span className={classNames(`default`)}>{gem.name}</span>
    </>
  );
}

function QuestTextComponent(text: string) {
  return <span className={classNames("quest_text")}>{text}</span>;
}

function WaypointComponent() {
  return (
    <>
      <img src="/images/waypoint.png" className={classNames("icon")} />
      <span className={classNames("waypoint")}>Waypoint</span>
    </>
  );
}

function VendorComponent() {
  return (
    <>
      <span className={classNames("default")}>Vendor</span>
    </>
  );
}

function VendorRewardComponent(gem: Gem) {
  return (
    <>
      <span className={classNames(`gem-${gem.primary_attribute}`)}>⏺ </span>
      <span>Buy </span>
      <span className={classNames(`default`)}>{gem.name}</span>
    </>
  );
}

function TrialComponent() {
  return (
    <>
      <img src="/images/trial.png" className={classNames("icon")} />
      <span className={classNames("trial")}>Trial of Ascendancy</span>
    </>
  );
}

function TownComponent() {
  return (
    <>
      <span className={classNames("default")}>Logout</span>
    </>
  );
}

function PortalComponent() {
  return (
    <>
      <img src="/images/portal.png" className={classNames("icon")} />
      <span className={classNames("portal")}>Portal</span>
    </>
  );
}

const directions = [
  "North",
  "North-East",
  "East",
  "South-East",
  "South",
  "South-West",
  "West",
  "North-West",
];

function DirectionComponent(dirIndex: number) {
  return <span>{directions[dirIndex]}</span>;
}

function NpcComponent(npcName: string) {
  return <span className={classNames("default")}>{npcName}</span>;
}

function CraftingComponent() {
  return (
    <>
      <img src="/images/crafting.png" className={classNames("icon")} />
      <span className={classNames("default")}>Crafting Recipe</span>
    </>
  );
}

function AscendComponent() {
  return (
    <>
      <img src="/images/trial.png" className={classNames("icon")} />
      <span className={classNames("trial")}>Ascend</span>
    </>
  );
}

export function ExileAction({ action, lookup }: ActionProps) {
  switch (action.type) {
    case "kill":
      return EnemyComponent(action.value);
    case "area":
      return AreaComponent(lookup.areas[action.areaId]);
    case "enter":
      return AreaComponent(lookup.areas[action.areaId]);
    case "quest": {
      return QuestComponent(lookup.quests[action.questId]);
    }
    case "quest_reward":
      return QuestRewardComponent(lookup.gems[action.gemId]);
    case "quest_text":
      return QuestTextComponent(action.value);
    case "waypoint": {
      if (action.areaId == null) return WaypointComponent();
      return (
        <>
          {WaypointComponent()}
          <span> ➞ </span>
          {AreaComponent(lookup.areas[action.areaId])}
        </>
      );
    }
    case "get_waypoint":
      return WaypointComponent();
    case "vendor":
      return VendorComponent();
    case "vendor_reward":
      return VendorRewardComponent(lookup.gems[action.gemId]);
    case "trial":
      return TrialComponent();
    case "town":
      return TownComponent();
    case "set_portal":
      return PortalComponent();
    case "use_portal":
      return PortalComponent();
    case "dir":
      return DirectionComponent(action.dirIndex);
    case "npc":
      return NpcComponent(action.value);
    case "crafting":
      return CraftingComponent();
    case "ascend":
      return AscendComponent();
  }

  return <>{`Unmapped: ${JSON.stringify(action)}`}</>;
}