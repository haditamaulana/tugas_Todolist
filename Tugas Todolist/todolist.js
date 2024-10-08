
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';

const TodoList = () => {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: 'Learn React Native',
      completed: false,
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleAddTodo = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter your todo');
      return;
    }

    if (isEditing) {
      setTodo(prevTodos => 
        prevTodos.map(item => 
          item.id === editId ? { ...item, title } : item
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      const newTodo = {
        id: todo.length + 1,
        title: title,
        completed: false,
      };
      setTodo([...todo, newTodo]);
    }
    
    setTitle('');
  };

  const handleDeleteTodo = (id) => {
    setTodo(prevTodos => prevTodos.filter(item => item.id !== id));
  };

  const handleEditTodo = (item) => {
    setTitle(item.title);
    setIsEditing(true);
    setEditId(item.id);
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10, gap: 10 }}>
        <TextInput
          placeholder="Enter your todo"
          style={{
            flex: 1,
            borderColor: 'black',
            borderWidth: 1,
            padding: 10,
          }}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable
          style={{
            backgroundColor: isEditing ? 'green' : 'blue',
            padding: 10,
            borderRadius: 5,
            height: 40,
          }}
          onPress={handleAddTodo}
        >
          <Text style={{ color: 'white' }}>
            {isEditing ? 'Update Todo' : 'Add Todo'}
          </Text>
        </Pressable>
      </View>

      {todo.map(item => (
        <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 18, color: 'black' }}>{item.title}</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable
              style={{ backgroundColor: 'orange', padding: 5, borderRadius: 5 }}
              onPress={() => handleEditTodo(item)}
            >
              <Text style={{ color: 'white' }}>Edit</Text>
            </Pressable>
            <Pressable
              style={{ backgroundColor: 'red', padding: 5, borderRadius: 5 }}
              onPress={() => handleDeleteTodo(item.id)}
            >
              <Text style={{ color: 'white' }}>Delete</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TodoList;
