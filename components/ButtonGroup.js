import { Pressable, Text, View } from 'react-native'
import React from 'react'

const ButtonGroup = ({first, second, third, fourth,  handleNumberPress, handleOperationPress }) => {
  return (
		<View className='flex-row items-center w-full space-x-3 justify-center px-10 mb-2'>
			<Pressable
				className=' bg-white py-4 rounded-xl shadow-md w-1/4'
				onPress={() => handleNumberPress(first)}
			>
				<Text className='text-3xl text-gray-600 font-semibold text-center'>{first}</Text>
			</Pressable>
			<Pressable
				className=' bg-white py-4   rounded-xl shadow-md w-1/4'
				onPress={() => handleNumberPress(second)}
			>
				<Text className='text-3xl text-gray-600 font-semibold text-center'>
					{second}
				</Text>
			</Pressable>
			<Pressable
				className=' bg-white py-4 rounded-xl shadow-md w-1/4'
				onPress={() => handleNumberPress(third)}
			>
				<Text className='text-3xl text-gray-600 font-semibold text-center'>{third}</Text>
			</Pressable>
			<Pressable
				className='bg-blue-600 py-4  rounded-xl shadow-md w-1/4'
				onPress={() => handleOperationPress(fourth)}
			>
				<Text className='text-3xl text-white font-semibold text-center'>{fourth}</Text>
			</Pressable>
		</View>
	);
}

export default ButtonGroup;