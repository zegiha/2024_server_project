import {Text, DimensionValue} from "react-native";
import {Colors} from "../shared/constants/color.ts";
import {ReactNode} from "react";

type textColors = 'dim' | 'normal' | 'variable' | 'warn' | 'primary';

interface ITypo {
  children: ReactNode
  color?: textColors
  width?: DimensionValue
  underLine?: boolean
  emphasize?: boolean
  textOverflow?: boolean
  onClick?: () => void
}

interface IBaseTypo extends ITypo {
  fontSize: number
}

function BaseTypo({
  fontSize,
  color,
  children,
  width,
  underLine,
  emphasize,
  textOverflow,
  onClick,
}: IBaseTypo) {
  const getColor = () => {
    switch (color) {
      case 'dim': return Colors.gray500;
      case 'normal': return Colors.gray700;
      case 'variable': return Colors.gray800;
      case 'primary': return Colors.primary600;
      case 'warn': return Colors.systemRed;
    }
  }
  return <Text
    style={{
      fontFamily: 'Wanted Sans',
      fontSize: fontSize,
      fontWeight: emphasize ? 600 : 400,
      color: getColor(),
      width: width ? width : 'auto',
      textDecorationLine: underLine ? 'underline' : 'none',
    }}
    numberOfLines={textOverflow ? 1 : undefined}
    ellipsizeMode={textOverflow ? 'tail' : undefined}
    onPress={onClick}
  >
    {children}
  </Text>;
}

function Caption(props: ITypo) {
  return <BaseTypo
    {...props}
    fontSize={14}
    color={props.color ?? 'normal'}
  />;
}

function Contents(props: ITypo) {
  return <BaseTypo
    {...props}
    fontSize={16}
    color={props.color ?? 'normal'}
  />;
}

function Body(props: ITypo) {
  return <BaseTypo
    {...props}
    fontSize={20}
    color={props.color ?? 'normal'}
  />;
}

function Title(props: ITypo) {
  return <BaseTypo
    {...props}
    fontSize={24}
    color={props.color ?? 'normal'}
  />;
}

export const Typo = {
  Title,
  Body,
  Contents,
  Caption,
};
