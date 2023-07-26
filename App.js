import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import ButtonGroup from './components/ButtonGroup';
import { Feather } from "@expo/vector-icons"; 
import { useState } from 'react';

export default function App() {
  const [firstNumber, setFirstNumber] = useState("")
  const [secondNumber, setSecondNumber] = useState("")
  const [operation, setOperation] = useState("")

	const percentageFunction = () => {
		if (!secondNumber) {
			return setFirstNumber(parseFloat(firstNumber) / 100)
		}
	}
	const deleteFunction = () => {
		if (operation) {
			return setSecondNumber(secondNumber.slice(0,-1))
		}
		return setFirstNumber(firstNumber.toString().slice(0,-1))
	}
	const changeSignFunction = () => {
		if (operation) {
			if (secondNumber.startsWith("-")) {
				return setSecondNumber(secondNumber.replace("-", "+"));
			}
			if (secondNumber.startsWith("+")) {
				return setSecondNumber(secondNumber.replace("+", "-"));
			}
			return setSecondNumber(`-${secondNumber}`);
		} else {
			if (firstNumber.toString().startsWith("-")) {
				return setFirstNumber(firstNumber.toString().replace("-", "+"));
			}	
			if (firstNumber.toString().startsWith("+")) {
				return setFirstNumber(firstNumber.toString().replace("+", "-"));
			}
			return setFirstNumber(`-${firstNumber}`);
		}
		
	};
	
	const handleNumberPress = (value) => {

		if (!operation && firstNumber.length < 10) {
			if (value !== ".") {
			setFirstNumber(firstNumber + value);
			} else {
				if (firstNumber.includes(".")) {
					return
				} else {
					setFirstNumber(firstNumber + value);
				}
		}
			
		}
		if (operation && secondNumber.length < 10) {
			if (value !== ".") {
				setSecondNumber(secondNumber + value);
			} else {
				if (secondNumber.includes(".")) {
					return;
				} else {
					setSecondNumber(secondNumber + value);
				}
			}
		}
	}
	const handleOperationPress = (value) => {
		if (
			firstNumber[firstNumber.length - 1] === "x" ||
			firstNumber[firstNumber.length - 1] === "+" ||
			firstNumber[firstNumber.length - 1] === "-" ||
			firstNumber[firstNumber.length - 1] === "%" ||
			firstNumber[firstNumber.length - 1] === "÷" || operation !== ""
		) {
			return;
		}
		setOperation(value)
	}
	
	const clearScreen = () => {
		setFirstNumber("")
		setSecondNumber("")
		setOperation("")
	}
	
	const display = () => {	
		 if (!secondNumber && !firstNumber) {
				return "0";
		 }
		if (!secondNumber) {
			return `${firstNumber}${operation}`;
		}
		else {
			return `${secondNumber}`;
		}
		
	}
	const getResult = () => {
		switch (operation) {
			case "+":
				clearScreen();
				setFirstNumber(parseFloat(firstNumber) + parseFloat(secondNumber));
				setOperation("");
				setSecondNumber("");
				break;
			case "-":
				clearScreen();
				setFirstNumber(parseFloat(firstNumber) - parseFloat(secondNumber));
				setOperation("");
				setSecondNumber("");
				break;
			case "x":
				clearScreen();
				setFirstNumber(parseFloat(firstNumber) * parseFloat(secondNumber));
				setOperation("");
				setSecondNumber("");
				break;
			case "÷":
				clearScreen();
				const value = (parseInt(firstNumber) / parseInt(secondNumber))
				if (value !== Math.round(value) && value !== Math.trunc(value)) {
				setFirstNumber(value.toFixed(5))
				} else {
					setFirstNumber(value)
				}
				setOperation("");
				setSecondNumber("");
				break;
			default:
				clearScreen();
				break;
		}
	}
  return (
	  <SafeAreaView className='flex-1 items-center'>
		  
			<View className='flex-1 w-full bg-blue-50 rounded-xl p-4 mb-4 items-end justify-end'>
			  <Text className={`${firstNumber.length <= 7 ? "text-8xl" : "text-6xl"}`}>
				 {display()}
			  </Text>
			</View>

			<View className='w-full rounded-xl py-4'>
				<View className='flex-row items-center w-full space-x-3 justify-center px-10 mb-2'>
					<Pressable
						className='bg-gray-600 py-4   rounded-xl shadow-md w-1/4'
						onPress={() => clearScreen()}
					>
						<Text className='text-3xl text-white font-semibold text-center'>
							C
						</Text>
					</Pressable>

					<Pressable
						className='bg-gray-600 py-4   rounded-xl shadow-md w-1/4'
						onPress={() => changeSignFunction()}
					>
						<Text className='text-3xl text-white font-semibold text-center'>
							+/-
						</Text>
					</Pressable>

					<Pressable
						className='bg-gray-600 py-4 rounded-xl shadow-md w-1/4'
						onPress={() => percentageFunction()}
					>
						<Text className='text-3xl text-white font-semibold text-center'>
							%
						</Text>
					</Pressable>

					<Pressable
						className='bg-blue-600 py-4   rounded-xl shadow-md w-1/4'
						onPress={() => handleOperationPress("÷")}
					>
						<Text className='text-3xl text-white font-semibold text-center'>
							÷
						</Text>
					</Pressable>

				</View>
				<ButtonGroup
					first='7'
					second='8'
					third='9'
					fourth='x'
					handleNumberPress={handleNumberPress}
					handleOperationPress={handleOperationPress}
				/>

				<ButtonGroup
					first='4'
					second='5'
					third='6'
					fourth='-'
					handleNumberPress={handleNumberPress}
					handleOperationPress={handleOperationPress}
				/>
				<ButtonGroup
					first='1'
					second='2'
					third='3'
					fourth='+'
					handleNumberPress={handleNumberPress}
					handleOperationPress={handleOperationPress}
				/>
        
				<View className='flex-row items-center w-full space-x-3 justify-center px-10 mb-2'>
					<Pressable
						className='bg-white py-4   rounded-xl shadow-md w-1/4'
						onPress={() => handleNumberPress(".")}
					>
						<Text className='text-3xl text-gray-600 font-semibold text-center'>
							.
						</Text>
					</Pressable>
					<Pressable
						className='py-4   rounded-xl shadow-md w-1/4'
						onPress={() => handleNumberPress("0")}
					>
						<Text className='text-3xl text-gray-600 font-semibold text-center'>
							0
						</Text>
					</Pressable>
					<Pressable
						className='bg-white py-4 rounded-xl items-center justify-center shadow-md w-1/4'
						onPress={() => deleteFunction()}
					>
						<Feather name='delete' size={24} color='black' />
					</Pressable>
					<Pressable
						className='bg-blue-600 py-4 rounded-xl shadow-md w-1/4'
						onPress={() => getResult()}
					>
						<Text className='text-3xl text-white font-semibold text-center'>
							=
						</Text>
					</Pressable>
				</View>
			</View>

			<StatusBar style='auto' />
		</SafeAreaView>
	);
}