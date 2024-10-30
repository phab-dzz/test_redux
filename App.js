import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, FlatList, TextInput, ActivityIndicator,ScrollView } from 'react-native';
import store from './store';
import { fetchDataRequest, createDataRequest, updateDataRequest, deleteDataRequest } from './actions';

const DataComponent = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state);
  const [title, setTitle] = useState('');
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  const handleCreate = () => {
    dispatch(createDataRequest({ title }));
    setTitle('');
  };

  const handleUpdate = () => {
    dispatch(updateDataRequest(updateId, { title }));
    setTitle('');
    setUpdateId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteDataRequest(id));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView style ={{width:"100%"}}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button
        title={updateId ? "Update" : "Create"}
        onPress={updateId ? handleUpdate : handleCreate}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
            <Text>{item.title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Button title="Edit" onPress={() => { setTitle(item.title); setUpdateId(item.id); }} />
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

const App = () => (
  <Provider store={store}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DataComponent />
    </View>
  </Provider>
);

export default App;