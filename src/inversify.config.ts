import {Container} from 'inversify';
import { TYPES } from './types';
import {AddressService, AddressServiceImpl} from './service/AddressService';
import { AddressRepository } from './repository/AddressRepository';
import {AddressController} from './controller/AddressController';
import {RegistrableController} from './controller/RegisterableController';
import { RegisterableSocket } from './socket/RegisterableSocket';
import { ConfigSocket } from './socket/ConfigSocket';
const container = new Container();
// RegistrableController is the only interface the IOC container needs to know about.
// Does not need to know the types of the controllers that implement it.
// Only needs the register method. So all controllers can derive and be bound by that contract.
container.bind<RegistrableController>(TYPES.Controller).to(AddressController);
container.bind<RegisterableSocket>(TYPES.Socket).to(ConfigSocket);
container.bind<AddressService>(TYPES.AddressService).to(AddressServiceImpl);
container.bind<AddressRepository>(TYPES.AddressRepository).to(AddressRepository);

export default container;
